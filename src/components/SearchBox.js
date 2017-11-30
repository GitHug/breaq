import React, { PureComponent } from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                places: [],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    this.props.onChangePlace(places);

                    this.setState({
                        places,
                    });
                },
            })
        },
    }),
)(props =>
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            onPlacesChanged={props.onPlacesChanged} >
            <input
                type="text"
                placeholder="Where is your home base?"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `100%`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </StandaloneSearchBox>
    </div>
);

class SearchBox extends PureComponent {

    onChangePlace = (places) => {
        this.props.onChangePlace(places);
    };

    render() {
        return (
            <PlacesWithStandaloneSearchBox onChangePlace={this.onChangePlace}/>
        )
    }
}

export default SearchBox;