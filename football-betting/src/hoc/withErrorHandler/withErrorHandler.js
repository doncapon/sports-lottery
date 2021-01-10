import React, { Component } from 'react';

import ModalSecond from '../../components/UI/ModalSecond/ModalSecond';
import Auxy from '../Auxy/Auxy';

const WithErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }

        render () {
            return (
                <Auxy>
                    <ModalSecond
                        show={this.state.error}
                        ModalSecondlosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </ModalSecond>
                    <WrappedComponent {...this.props} />
                </Auxy>
            );
        }
    }
}

export default WithErrorHandler;