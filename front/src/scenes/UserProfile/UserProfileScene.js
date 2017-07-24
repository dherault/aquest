import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import CommitCreationForm from './components/CommitCreationForm';
import CommitsList from './components/CommitsList';

import UserShowcase from '../../components/UserShowcase';
import NavBar from '../../components/NavBar';
import BackgroundImage from '../../components/BackgroundImage';
import Footer from '../../components/Footer';

class UserProfileScene extends Component {

  render() {
    const { viewer } = this.props;
    // const vocationInstances = viewer.vocationInstances.edges.map(e => e.node);

    return (
      <BackgroundImage src={viewer.backgroundImageUrl}>
        <NavBar viewer={viewer} />

        <BackgroundImage.Content>
          <section className="rcc" style={{ marginTop: '4rem' }}>
            <UserShowcase
              user={viewer} 
            />
          </section>

          <section>
            <CommitsList viewer={viewer} />
          </section>
        </BackgroundImage.Content>

        <Footer />
      </BackgroundImage>
    );
  }
}

export default createFragmentContainer(UserProfileScene, graphql`
  fragment UserProfileScene_viewer on User {
    id
    backgroundImageUrl

    ...NavBar_viewer
    ...UserShowcase_user
    ...CommitsList_viewer
  }
`);
