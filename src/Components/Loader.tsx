import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
const LoaderComp = () => {
    return (
        <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
      );
}

export default LoaderComp