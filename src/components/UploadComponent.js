import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {
    Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant, PageSection, Text,
    TextContent,
    TextVariants, Title
} from "@patternfly/react-core";

import Dropzone from "react-dropzone";
import {Icon} from '@fluentui/react/lib/Icon';
import BreadcrumbComponent from "./util/BreadcrumbComponent";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        }
    }

    render() {
        const UploadBox = () => {
            return (
                <Dropzone onDrop={files => this.setState({files: files})}>

                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()}/>

                            <EmptyState variant={EmptyStateVariant.small}>
                                <EmptyStateIcon icon={() => <Icon style={{fontSize: "64px"}} iconName="Upload"/>}/>
                                <Title headingLevel="h4" size="lg">
                                    Drag to upload
                                </Title>
                                <EmptyStateBody>
                                    Audio files only.
                                </EmptyStateBody>
                                <Button variant="primary">Open File Dialog</Button>
                                <ul style={{marginTop: "20px"}}>
                                    {this.state.files.map(file => (
                                        <li key={file.path}>
                                            {file.path} - {file.size} bytes
                                        </li>
                                    ))}
                                </ul>
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
                <PageSection>
                    <UploadBox/>
                </PageSection>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(UploadComponent));