import { useState } from "react";

export default function ProductDescription({ description, maxLength = 200 }){
    const [isExpanded, setIsExpanded] = useState(false);

    const truncateText = (text, max) => {
        if (text.length <= max) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', max));
        return truncated;
    }

    const shouldShowButton = description.length > maxLength;
    const displayText = isExpanded ? description : truncateText(description, maxLength);
    
    return(
        <div className="text-sm">
            <p>
                {displayText}
                {!isExpanded && shouldShowButton && <span className="block">...</span>}
            </p>
            {shouldShowButton && 
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-green-600 cursor-pointer"
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            }
        </div>
    )
}