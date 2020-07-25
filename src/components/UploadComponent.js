import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {PageSection, Text, TextContent, TextVariants} from "@patternfly/react-core";
import Dropzone from "react-dropzone";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        }

        this.getUploadParams = ({meta}) => {
            const url = '';
            return {
                url, meta
            }
        }

        this.handleChangeStatus = ({meta}, status) => {
            console.log(status, meta);
        }

        this.handleSubmit = (files, allFiles) => {
            console.log(files.map(f => f.meta));
            allFiles.forEach(f => f.remove());
        }
    }


    render() {
        return (
            <React.Fragment>
                <PageSection>
                    <TextContent>
                        <Text component={TextVariants.h1}>Upload music to {this.props.collection.name}</Text>
                        <Text component={TextVariants.p}>The uploader supports batch files as well.</Text>
                    </TextContent>
                </PageSection>
                <PageSection>

                    <Dropzone
                        getUploadParams={this.getUploadParams}
                        onChangeStatus={this.handleChangeStatus}
                        onSubmit={this.handleSubmit}
                        accept="audio/*"
                        inputContent={(files, extra) => (extra.reject ? 'Audio files only' : 'Upload files')}
                        styles={{
                            dropzoneReject: {borderColor: 'red', backgroundColor: '#DAA'},
                            inputLabel: (files, extra) => (extra.reject ? {color: 'red'} : {}),
                        }}
                    />

                </PageSection>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(UploadComponent));