import { useEffect, useRef, useState } from "react";

export default function ProductDescription({ description }){
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const descRef = useRef(null);

    // Truncate text with a specific length
    // const truncateText = (text, max) => {
    //     if (text.length <= max) return text;
    //     const truncated = text.slice(0, text.lastIndexOf(' ', max));
    //     return truncated;
    // }
    // const displayText = isExpanded ? description : truncateText(description, maxLength);
    // const shouldShowButton = description.length > maxLength;

    useEffect(() => {
        if (descRef.current){
            const isTruncated = descRef.current.scrollHeight > descRef.current.clientHeight;
            setShowButton(isTruncated);
        }
    }, [description])

    return(
        <div className="text-sm">
            <p
                ref={descRef} 
                className={`overflow-hidden ${!isExpanded ? 'line-clamp-4' : ''}`}
            >
                {description}
            </p>
            {/* {!isExpanded && showButton && <span className="block">...</span>} */}
            {showButton && 
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