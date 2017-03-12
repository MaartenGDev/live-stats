import React from "react";

export default ({image, username, level, content, actionTitle}) => {
   return <section className="card">
        <section className="card__avatar">
            <img className="card__image" src={image}/>
            <section className="card__overlay"></section>
        </section>
        <section className="card__header">
            <h2 className="card__title card__title--primary">{username}</h2>
            <p className="card__title card__title--secondary">Level {level}</p>
        </section>
        <section className="card__content">
            {content}
        </section>
        <section className="card__actions">
            <a className="btn btn--material">
                {actionTitle}
            </a>
        </section>
    </section>
}