import {
  compose,
  withStateHandlers,
  withHandlers,
  mapProps,
  lifecycle
} from "recompose";
import { omit } from "ramda";

const apiCall = async url => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error.message;
  }
};

const hocApiCall = url => {
  return compose(
    withStateHandlers(
      {
        hocFetchResult: {
          data: null,
          loading: false,
          error: null
        }
      },
      {
        receiveData: () => data => ({
          hocFetchResult: {
            data,
            loading: false,
            error: null
          }
        }),
        receiveError: () => error => ({
          hocFetchResult: {
            data: null,
            loading: false,
            error: error || true
          }
        }),
        startFetch: ({ hocFetchResult: prevState }) => () => ({
          hocFetchResult: {
            ...prevState,
            loading: true
          }
        })
      }
    ),

    withHandlers({
      fetchData: props => () => {
        props.startFetch();
        apiCall(url).then(props.receiveData, props.receiveError);
      }
    }),

    mapProps(props =>
      omit(["receiveData", "receiveError", "startFetch"], props)
    ),

    lifecycle({
      componentDidMount() {
        this.props.fetchData();
      }
    })
  );
};

export default hocApiCall;
