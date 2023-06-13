import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BiEditAlt, BiToggleLeft, BiInfoCircle } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the master list of sections
const sectionList = [
  {
    id: 'Profile',
    name: 'Profile Summary',
    description: 'Add your Profile Summary',
    enabled: true,
  },
  {
    id: 'academicAchievements',
    name: 'Academic and Cocurricular Achievements',
    description: 'Include your educational background',
    enabled: true,
  },
  {
    id: 'intern experience',
    name: 'Summer Internship Experience',
    description: 'List your intern experience',
    enabled: true,
  },
  {
    id: 'experience',
    name: 'Work Experience',
    description: 'List your work experience',
    enabled: true,
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Highlight your Projects',
    enabled: true,
  },
  {
    id: 'certification',
    name: 'Certifications',
    description: 'Highlight your Certifications',
    enabled: true,
  },
  {
    id: 'leadership',
    name: 'Leadership Positions',
    description: 'leadership',
    enabled: true,
  },
  {
    id: 'certification',
    name: 'Extracurricular',
    description: 'Highlight your Certifications',
    enabled: true,
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Education Details',
    enabled: true,
  },
];

const App = () => {
  const [sections, setSections] = useState(sectionList);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [reorderedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);

    setSections(newSections);
  };

  const handleSectionNameChange = (index, newName) => {
    const newSections = [...sections];
    newSections[index].name = newName;

    setSections(newSections);
  };

  const handleSectionToggle = (index) => {
    const newSections = [...sections];
    newSections[index].enabled = !newSections[index].enabled;

    setSections(newSections);
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log('Saving changes:', sections);
  };

  return (
    <div className="App">
      <div className="heading">Select Your Sections</div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className={`section ${section.enabled ? '' : 'disabled'}`}
                    >
                      <div className="section-header" {...provided.dragHandleProps}>
                        <span className="section-name">{section.name}</span>
                        <button className="edit-button" onClick={() => handleSectionNameChange(index, prompt('Enter new section name'))}>
                          <BiEditAlt />
                        </button>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`toggleSwitch-${section.id}`}
                            checked={section.enabled}
                            onChange={() => handleSectionToggle(index)}
                          />
                          <label className="form-check-label" htmlFor={`toggleSwitch-${section.id}`}>
                          </label>
                        </div>
                        <button className="info-button" onClick={() => alert(section.description)}>
                          <AiOutlineInfoCircle />
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button className="save-button" onClick={handleSave}>
        Save and Next
      </button>
    </div>
  );
};

export default App;
