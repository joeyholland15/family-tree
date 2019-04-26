import React, { Fragment } from 'react';
import FamilyMember from './FamilyMember';
import familyTreeData from './familyTreeData';

const FamilyTree = () => (
  <Fragment>
    {familyTreeData.map((member) => (
      <FamilyMember key={member.name} member={member} />
    ))}
  </Fragment>
);

export default FamilyTree;
