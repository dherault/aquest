import React from 'react';
import moment from 'moment';
import { createFragmentContainer, graphql } from 'react-relay';

import DiskImage from './DiskImage';

const sLayout = {
  backgroundColor: 'white',
  minWidth: '50vw',
  maxWidth: '100vw',
  padding: '1rem',
  boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.50)',
};

const Layout = ({ children }) => (
  <article className="rlt" style={sLayout}>
    {children}
  </article>
);

const sLayoutLeft = {
  marginRight: '1rem',
};

const LayoutLeft = ({ children }) => (
  <div style={sLayoutLeft}>
    {children}
  </div>
);

const sLayoutRight = {
  flexGrow: 1,
  // marginTop: '-0.5rem',
  // marginBottom: '-0.6rem',
};

const LayoutRight = ({ children }) => (
  <div style={sLayoutRight}>
    {children}
  </div>
);

const sLayoutHeader = {
  marginBottom: '0.5rem',
};

const LayoutHeader = ({ children }) => (
  <div style={sLayoutHeader} className="has-black-color">
    {children}
  </div>
);

const sLayoutContent = {
  flexGrow: 1,
};

const LayoutContent = ({ children }) => (
  <div style={sLayoutContent} className="has-full-width has-black-color">
    {children}
  </div>
);

const Story = ({ story }) => (
  <Layout>

    <LayoutLeft>
      <DiskImage />
    </LayoutLeft>

    <LayoutRight>

      <LayoutHeader>
        <strong>{story.vocation.label}</strong>
        <em className="has-grey-color" style={{ marginLeft: '1rem', fontSize: '1.5rem' }}>
          {moment(story.createdAt).fromNow()}
        </em>
      </LayoutHeader>

      <LayoutContent>
        {story.label}
      </LayoutContent>

    </LayoutRight>
  </Layout>
);

const StoryContainer = createFragmentContainer(Story, graphql`
  fragment Story_story on Story {
    id
    label
    createdAt
    sourceUser {
      id
      pseudo
    }
    vocation {
      id
      label
    }
  }
`);

Object.assign(StoryContainer, {
  Layout,
  LayoutLeft,
  LayoutRight,
  LayoutHeader,
  LayoutContent,
});

export default StoryContainer;
