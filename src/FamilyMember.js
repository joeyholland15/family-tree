import React from 'react';
import './FamilyMember.css';

class FamilyMember extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      children: props.member.children,
      isAddingChild: false,
      newChildName: '',
    }
  }

  toggleAddingChild = () => {
    this.setState({ isAddingChild: !this.state.isAddingChild });
  }

  handleEditChildName = (e) => {
    this.setState({ newChildName: e.target.value });
  }

  addChild = () => {
    const newChild = {
      name: this.state.newChildName,
      properties: {},
      children: [],
    }

    // Add new child to the member's children array and reset input state
    this.setState({
      children: [
        ...this.state.children,
        newChild,
      ],
      newChildName: '',
      isAddingChild: false,
    });
  }

  removeNode = (child) => {
    // Find and remove a member from its parent's children array
    // NOTE: this assumes that all names are unique identifiers
    const nextChildren = [...this.state.children];

    const childIndex = nextChildren.findIndex(item => item.name === child);

    nextChildren.splice(childIndex, 1);

    this.setState({ children: nextChildren });
  }

  render() {
    const { member } = this.props;

    const hasChildren = this.state.children.length > 0;

    return (
      <div>
        <div className="container">
          <div className="member-name">{member.name}</div>

          {/*
            Button to remove the node (and its descendants if it has any).
            NOTE: This option is missing for the top single parent since it would delete all nodes.
            With more time I'd add an empty state where a new tree could be created to support this.
          */}
          {this.props.onRemoveNode && (
            <button
              onClick={() => { this.props.onRemoveNode(member.name); }}
            >
              Remove Node {hasChildren && '& Children'}
            </button>
          )}

          {/*
            The first click to this button shows an input to allow entering a new child's name.
            The second takes the input and adds the child to the state's children list.
          */}
          <button onClick={this.state.isAddingChild ? this.addChild : this.toggleAddingChild}>
            {this.state.isAddingChild ? 'Save' : '+ Child'}
          </button>

          {/*
            Show input if the user is adding a new child's name
            TODO: Add ability to cancel this and hide input
          */}
          {this.state.isAddingChild && (
            <input
              onChange={this.handleEditChildName}
              value={this.state.newChildName}
              placeholder="Add Child Name"
            />
          )}
        </div>

        {/*
          Render a <FamilyMember /> recursively for each child until the base case is met
          (occurs when member has no children)

          NOTE: Passing removeNode down as a callback prop provides each child with access to update
          its parent's local state children array. This way, the member can be removed from its
          parent's children array rather than traversing the whole family tree to find the member.
        */}
        {hasChildren && (
          <div className="child-container">
            {this.state.children.map(child => (
              <FamilyMember
                key={child.name}
                member={child}
                onRemoveNode={this.removeNode}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default FamilyMember;
