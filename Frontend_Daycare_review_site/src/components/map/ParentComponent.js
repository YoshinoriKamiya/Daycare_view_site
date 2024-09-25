import React, { useState } from 'react';
import AreaSearch from './AreaSearch';
import Map from './Map';
import '../scss/area-search.scss'; 
import '../scss/map.scss';

const ParentComponent = () => {
    const [selectedPrefecture, setSelectedPrefecture] = useState(null);

    const handlePrefectureSelect = (prefecture) => {
        setSelectedPrefecture(prefecture);
    };

    return (
        <div className="parent-container">
            <AreaSearch onSelectPrefecture={handlePrefectureSelect} />
            <Map selectedPrefecture={selectedPrefecture} />
        </div>
    );
};

export default ParentComponent;