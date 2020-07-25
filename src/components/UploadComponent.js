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
import BreadcrumbComponent from "./util/BreadcrumbComponent";
import {uploadToCollection} from "../api/collection";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            file: null,
        }

        this.handleFileChange = (e) => {
            console.log(e.target.files)
            this.setState({
                files: e.target.files,
                file: e.target.files[0],
            })
        }

        this.handleSubmit = async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("audioFile", this.state.file, this.state.file.name);

            try {
               console.log("Uploading file " + this.state.file.name);
               const response = await uploadToCollection(this.props.collection.id, formData);
               console.log("Response: " + JSON.stringify(response));
            } catch (e) {
               console.log("Failed to upload file: " + e);
            }
            // for (let i = 0; i < this.state.files.length; i++) {
            //     let file = this.state.files[i];
            //     try {
            //         console.log("Uploading file " + file.name);
            //         const response = await uploadToCollection(this.props.collection.id, file);
            //         console.log("Response: " + JSON.stringify(response));
            //     } catch (e) {
            //         console.log("Failed to upload file: " + e);
            //     }
            // }
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
                                <EmptyStateIcon icon={() => <Icon style={{fontSize: "64px"}} iconName="Upload"/>}/>
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

        const breadcrumbElements = [
            {
                link: '/',
                display: 'Collections',
                isActive: false,
            },
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
                    <Form onSubmit={this.handleSubmit}>
                        <UploadBox/>
                        <Button style={{maxWidth: "96px", textAlign: "center"}} type="submit" variant="primary">Submit</Button>

                        <ul style={{marginTop: "20px"}}>
                            {[...this.state.files].map(file => (
                                <li key={file.name}>
                                    {file.name} - {file.size} bytes
                                </li>
                            ))}
                        </ul>
                    </Form>
                </PageSection>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(UploadComponent));