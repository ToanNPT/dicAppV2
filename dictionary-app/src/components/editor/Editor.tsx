'use client'
import {useCallback, useRef, useState} from "react";
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react';
import "react-quill/dist/quill.snow.css";
import uploadFileToServer from "@core/utils/uploadFile";
import "../../assets/common.css";


Quill.register('modules/imageResize', ImageResize);


// import uploadToCloudinary from "./upload";

export interface EditorContentChanged {
    html: string;
    markdown: string;
}

export interface EditorProps {
    value?: EditorValue;
    onChange?: (changes: EditorValue) => void;
}

export type EditorValue = {
    index: number,
    data: any
}

export default function Editor(props: EditorProps) {
    const [value, setValue] = useState<string>(props.value?.data || "");
    const reactQuillRef = useRef<ReactQuill>(null);

    const onChange = (content: string) => {
        setValue(content);

        if (props.onChange) {
            props.onChange({
                index: props.value?.index,
                data: value
            });
        }
    };

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*,video/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const fileType = file.type.startsWith('image') ? 'image' : 'video';
                const url = await uploadFileToServer(file);
                console.log("img ru:", url)
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, fileType, url);
                }
            }
        };
    }, []);

    const videoHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "video/*");
        input.click();video
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const url = await uploadFileToServer(file);
                console.log("img ru:", url)
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, "video", url);
                }
            }
        };
    }, []);

    const modules = {

        toolbar: {
            container: [
                [{header: "1"}, {header: "2"}, {font: []}],
                [{size: []}],
                [{color: []}],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    {list: "ordered"},
                    {list: "bullet"},
                    {indent: "-1"},
                    {indent: "+1"},
                ],
                ["link", "image", "video"],
                ["code-block"],
                ["clean"],
            ],
            handlers: {
                image: imageHandler,
                video: videoHandler
            },
        },
        clipboard: {
            matchVisual: false,
        },
        imageResize: {
            // parchment: Quill.import('parchment'),
            modules: [ 'Resize', 'DisplaySize' ]
        }
    }


    return (
        <ReactQuill
            ref={reactQuillRef}
            theme="snow"
            placeholder="Start writing..."
           
            formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "code-block",
            ]}
            modules={modules}
            value={value}
            onChange={onChange}
        />
    );
}