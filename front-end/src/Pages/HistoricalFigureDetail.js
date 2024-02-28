import React, { useEffect, useState } from "react";
import {useParams, Link} from'react-router-dom';
import {getHistoricalFiguresDetail} from '../utils/API.js';
import ItemCard from "../Component/ItemCard.js";
import EventCard from "../Component/EventCard";

function HistoricalFiguresDetail () {
    let { hfId } = useParams();
    const [HistoricalFiguresDetail, setHistoricalFiguresDetail] = useState({})  

    let hfSkill = HistoricalFiguresDetail.hf_skill ? 
    HistoricalFiguresDetail.hf_skill.map((skillData) => {
        return <li key={skillData.skill}><ItemCard elementLeft={skillData.skill} elementRight={skillData.total_ip} /></li>
    })
    : null ;

    let entityLink = HistoricalFiguresDetail.entity_link ?
    HistoricalFiguresDetail.entity_link.map((entityData)=>{
        return (
            <li key={entityData.entity_id.toString()}>
                Lien : {entityData.link_type} avec <Link to={"/historical_figure/" + entityData.entity_id.toString()}>
                <span style={{color: "green"}}>{entityData.name}</span>
            </Link>
            </li>
        );
    }) : null;

    let hfLink = HistoricalFiguresDetail.hf_link ?
        HistoricalFiguresDetail.hf_link.map((entityData)=>{
            return (
                <li key={entityData.hfid.toString()}>
                    Lien : {entityData.link_type} avec <Link to={"/historical_figure/"+entityData.hfid.toString()}>
                        <span style={{color: "blue"}}>{entityData.name}</span>
                    </Link>
                </li>
            );
        }) 
        : null;

    let hfEvent = HistoricalFiguresDetail.eventLinked ? 
        HistoricalFiguresDetail.eventLinked
        .map((eventCollection)=>{
            return ( 
                <li key={eventCollection.id.toString()}>
                    <EventCard eventCollection={eventCollection}/>
                </li>
        )})
    : null;

    useEffect(()=> {
        getHistoricalFiguresDetail(setHistoricalFiguresDetail, hfId);
    }, [hfId])

    return (
        <div className={"hf-details-main-grid"}>
            <div className={"hf-details"}>
                <section className={"presentation-section"}>
                    <h1>{HistoricalFiguresDetail.name}</h1>
                    <h2 className={"goal"}>{HistoricalFiguresDetail.goal ? (
                        <span><span
                            className={"label"}>OBJECTIF</span> : {HistoricalFiguresDetail.goal.toUpperCase()}</span>
                    ) : ""}</h2>
                    <span className={"infos"}>
                {HistoricalFiguresDetail.race} -
                Birth:{HistoricalFiguresDetail.birth_year != -1 ? HistoricalFiguresDetail.birth_year : 'Never'} -
                Death:{HistoricalFiguresDetail.death_year != -1 ? HistoricalFiguresDetail.death_year : 'Never'} - {HistoricalFiguresDetail.caste}
                </span>
                </section>
                <section className={"hf-details-section"}>
                    <h3>SKILLS</h3>
                    <div>
                        <ul className={"skill-list"}>
                            {hfSkill}
                        </ul>
                    </div>
                </section>
                <section className={"hf-details-section"}>
                    <h3> RELATIONS </h3>
                    <div>
                        <ul>
                            {hfLink}
                        </ul>
                        <ul>
                            {entityLink}
                        </ul>
                    </div>
                </section>
                <section className={"hf-details-section"}>
                    <h3>EVENEMENTS</h3>
                    <div>
                        <ul className={"event-list"}>
                            {hfEvent}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default HistoricalFiguresDetail;