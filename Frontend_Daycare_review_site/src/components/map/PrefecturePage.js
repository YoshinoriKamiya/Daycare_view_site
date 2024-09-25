import React from 'react';
import { useParams } from 'react-router-dom';

const PrefecturePage = () => {
    const { prefecture } = useParams();

    return (
        <div>
            <h1>{prefecture}</h1>
            <p>Welcome to the {prefecture} page!</p>
        </div>
    );
};

export default PrefecturePage;