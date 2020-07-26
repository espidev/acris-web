import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {
    Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant, Form, PageSection, Text,
    TextContent,
    TextVariants, Title
} from "@patternfly/react-core";

import Dropzone from "react-dropzone";
import {Icon} from '@fluentui/react/lib/Icon';
import BreadcrumbComponent, {collectionBreadcrumb} from "./util/BreadcrumbComponent";
import {uploadToCollection} from "../api/collection";

import './UploadComponent.css';

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            uploaded: [],
            errored: [],
            file: null,
        }

        this.handleFileChange = (e) => {
            console.log(e.target.files)
            this.setState({
                files: e.target.files,
                file: e.target.files[0],
                uploaded: [],
                errored: [],
            })
        }

        this.handleSubmit = async (e) => {
            e.preventDefault();

            // loop files
            for (let i = 0; i < this.state.files.length; i++) {
                let file = this.state.files[i];
                const formData = new FormData();
                formData.append("file", file, file.name);
                try {
                    console.log("Uploading file " + file.name);
                    const response = await uploadToCollection(this.props.collection.id, formData, file.name);
                    console.log("Response: " + JSON.stringify(response));

                    // update message
                    this.setState({uploaded: this.state.uploaded.concat([file.name])});
                } catch (e) {
                    console.log("Failed to upload file: " + e);
                    // update message
                    this.setState({errored: this.state.errored.concat([file.name])});
                }
            }
        }
    }

    render() {
        const UploadBox = () => {
            return (
                <Dropzone onDrop={files => this.setState({files: files})} multiple>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} type="file" accept="audio/*" onChange={this.handleFileChange} required/>

                            <EmptyState variant={EmptyStateVariant.small}>
                                <EmptyStateIcon icon={() => <Icon style={{fontSize: "4em"}} iconName="Upload"/>}/>
                                <Title headingLevel="h4" size="lg">
                                    Drag to upload
                                </Title>
                                <EmptyStateBody>
                                    Click to open file dialog. Audio files only.
                                </EmptyStateBody>
                            </EmptyState>
                        </div>
                    )}
                </Dropzone>
            )
        }

        const FileState = (props) => {
            if (this.state.uploaded.includes(props.file.name)) {
                return " (Uploaded)";
            } else if (this.state.errored.includes(props.file.name)) {
                return " (Error)";
            } else {
                return "";
            }
        }

        const breadcrumbElements = [
            collectionBreadcrumb,
            {
                link: '/collection/' + this.props.collection.id,
                display: this.props.collection.name,
                isActive: false,
            },
            {
                link: '',
                display: 'Upload',
                isActive: true,
            }
        ];

        return (
            <React.Fragment>
                <PageSection>
                    <BreadcrumbComponent elements={breadcrumbElements}/>
                </PageSection>

                <PageSection>
                    <TextContent>
                        <Text component={TextVariants.h1}>Upload music to {this.props.collection.name}</Text>
                        <Text component={TextVariants.p}>The uploader supports multiple files as well.</Text>
                    </TextContent>
                </PageSection>
                <PageSection style={{textAlign: "center"}}>
                    <form onSubmit={this.handleSubmit} ref="form">
                        <UploadBox/>
                        <input className="submitButton" type="submit" value="Submit"/>

                        <ul style={{marginTop: "20px"}}>
                            {[...this.state.files].map(file => (
                                <li key={file.name}>
                                    {file.name} - {file.size} bytes <FileState file={file}/>
                                </li>
                            ))}
                        </ul>
                    </form>
                </PageSection>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(UploadComponent));