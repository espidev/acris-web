import React from "react";
import {Alert, AlertActionCloseButton, AlertGroup, AlertVariant} from "@patternfly/react-core";

export function addAlert(alerts, title, variant, key) {
    return [ ...alerts, { title: title, variant: variant, key }];
}

// props:
// obj: the parent object (alerts field should be in state)

export default class AlertComponent extends React.Component {

    render() {
        return (
            <AlertGroup isToast>
                {
                    this.props.obj.state.alerts.map(({key, variant, title}) => (
                        <Alert
                            title={title}
                            isLiveRegion
                            variant={AlertVariant[variant]}
                            actionClose={
                                <AlertActionCloseButton
                                    title={title}
                                    variantLabel={`${variant} alert`}
                                    onClose={() => this.props.obj.setState({alerts: [...this.props.obj.state.alerts.filter(el => el.key !== key)] })}
                                />
                            }
                        key={key} />
                    ))
                }
            </AlertGroup>
        );
    }
}