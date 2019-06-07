import React from 'react';

export function Mix({ children }) {
    return (
        <div className='mix-overflow-container'>
            <ul className='mix-group'>{children}</ul>
            <p>Mix component</p>
        </div>
    )
}

export function MixItem({ children }) {
    return <li className='mix-group-item'>{children}</li>;
}