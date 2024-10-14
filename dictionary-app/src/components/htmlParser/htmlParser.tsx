import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export type HtmlParserProps = {
    htmlContent: string
}

const HtmlParser = (props: HtmlParserProps) => {
    return (
        <div>
            {ReactHtmlParser(props.htmlContent)}
        </div>
    )
}
export default HtmlParser;