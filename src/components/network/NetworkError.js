import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { client, removeNetWorkError } from "../../actions/search";
import gql from "graphql-tag";


class NetworkError extends PureComponent {
  state = {
    errorBg: ""
  };

  componentDidMount() {
    this.getErrorGif();
    window.addEventListener("resize", this.getErrorGif);
    this.requestServer = setInterval(() => {
      this.removeError();
    }, 5000);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.getErrorGif);
    clearInterval(this.requestServer);
  };

  removeError = () => { // check if server is up and remove error page
    const { networkError } = this.props;
    if (networkError) {
      client.query({
        query: gql`
            {
                checkServer
            }
        `
      }).then(({ data }) => {
        if (data.checkServer) {
          this.props.dispatch(removeNetWorkError());
          clearInterval(this.requestServer);
        }
      })
      .catch(err => console.log(err));
    }
  };

  getErrorGif = (error = false) => {
    const mobileGif = "9w475hDWEPVlu";
    const desktopGif = "vNddkpsK44nNnAKYFM";
    const lowMedia = window.matchMedia("(max-width: 768px)").matches;
    const landscapeM = window.matchMedia(
      "(min-width: 480px) and (max-width: 815px) and (orientation: landscape)").matches;
    const highQuery = window.matchMedia("(min-width: 769px)").matches;
    const linkEnd = error ? ".gif" : ".webp";
    if (landscapeM) {
      this.setState(() => ({ errorBg: `https://media.giphy.com/media/${desktopGif}/giphy${linkEnd}` }))
    } else if (lowMedia) {
      this.setState(() => ({ errorBg: `https://media.giphy.com/media/${mobileGif}/giphy${linkEnd}` }))
    } else if (highQuery) {
      this.setState(() => ({ errorBg: `https://media.giphy.com/media/${desktopGif}/giphy${linkEnd}` }))
    }
  };
  Errorhandler = () => {
    this.getErrorGif(true)
  };

  render() {
    return (
      <div className="error">
        <p className="error-msg">network error right now we'll try to reconnect for ya</p>
        <img
          src={this.state.errorBg}
          alt="error"
          onError={this.Errorhandler}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    networkError: state.search.networkError
  };
};
export default connect(mapStateToProps)(NetworkError);