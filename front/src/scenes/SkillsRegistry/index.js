// import './Skills.css';
import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import createSkill from '../../mutations/CreateSkillMutation';
import createSkillInstance from '../../mutations/CreateSkillInstanceMutation';

class SkillsRegistry extends Component {
  state = { label: '' }

  render() {
    const { individuals, user } = this.props;
    const { label } = this.state;

    const userSkills = [];
    const nonUserSkills = [];
    const userSkillIds = user.skillInstances.edges.map(e => e.node.skill.id);

    individuals.skills.edges.forEach(e => {
      if (userSkillIds.includes(e.node.id)) userSkills.push(e.node);
      else nonUserSkills.push(e.node);
    });

    return (
      <div className="Skills" style={{ textAlign: 'center' }}>
        <h1>{`${individuals.skills.edges.length} Skills`}</h1>

        <input type="text" value={label} onChange={e => this.setState({ label: e.target.value })} />
        <button onClick={() => createSkill(this.state.label, individuals)}>Create</button>

        <h2>My skills</h2>
        <div>
          {userSkills.map(({ id, label }) =>
            <div key={id}>
              {label}
            </div>
          )}
        </div>

        <h2>Other skills</h2>
        <div>
          {nonUserSkills.map(({ id, label }) =>
            <div key={id} onClick={() => createSkillInstance(id, user)}>
              {label}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default createFragmentContainer(SkillsRegistry, graphql`
  fragment SkillsRegistry_individuals on Individuals {
    id
    skills(
      first: 2147483647  # max GraphQLInt
    ) @connection(key: "individuals_skills") {
      edges {
        node {
          id
          label
        }
      }
    }
  }

  fragment SkillsRegistry_user on Person {
    id
    skillInstances(
      first: 2147483647  # max GraphQLInt
    ) @connection(key: "user_skillInstances") {
      edges {
        node {
          id
          level
          skill {
            id
          }
        }
      }
    }
  }
`);