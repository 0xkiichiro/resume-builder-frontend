import { useState } from 'react';

const PersonDataForm = ({ initialData, onGeneratePDF }) => {
  const [data, setData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleInputChange = (section, index, key, value) => {
    const newData = { ...data };
    if (index !== null) {
      newData[section][index][key] = value;
    } else if (section === 'generic-info') {
      newData[key] = value;
    } else if (!key) {
      newData[section] = value;
    } else {
      newData[section][key] = value;
    }
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add current step to completedSteps
    setCompletedSteps([...completedSteps, currentStep]);

    // Move to next step
    setCurrentStep(currentStep + 1);

    // If all forms are completed, call onGeneratePDF
    if (currentStep === 6) {
      // assuming you have 6 data-groups
      onGeneratePDF(data);
    }
  };

  return (
    <div>
      {/* Visual Tracker */}
      <div className="tracker">
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className={
              step === currentStep
                ? 'active'
                : completedSteps.includes(step)
                ? 'completed'
                : ''
            }
          >
            {step}
          </span>
        ))}
      </div>
      <div>
        {/* Render forms based on currentStep */}
        {currentStep === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="generic-info data-group">
              <div className="name">
                <h2>Generic Info</h2>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={data.name}
                  onChange={(e) =>
                    handleInputChange(
                      'generic-info',
                      null,
                      'name',
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="title">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={data.title}
                  onChange={(e) =>
                    handleInputChange(
                      'generic-info',
                      null,
                      'title',
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="location">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={data.location}
                  onChange={(e) =>
                    handleInputChange(
                      'generic-info',
                      null,
                      'location',
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="about-text data-group">
              <label htmlFor="about_text">About Text</label>
              <input
                type="text"
                id="about_text"
                value={data.about_text}
                onChange={(e) =>
                  handleInputChange('about_text', null, null, e.target.value)
                }
              />
            </div>
            <div className="button-wrapper">
              <button type="submit">Next Step</button>
            </div>
          </form>
        )}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="experiences data-group">
              <h2>Experiences</h2>
              {data.experiences.map((exp, i) => (
                <div className={`experience-${i + 1}`} key={i}>
                  <h3>Experience {i + 1}</h3>
                  {Object.entries(exp).map(([key, val]) => (
                    <div className={key} key={key}>
                      <label htmlFor={`${key}-${i}`}>{key}</label>
                      <input
                        type="text"
                        id={`${key}-${i}`}
                        value={val || ''}
                        onChange={(e) =>
                          handleInputChange(
                            'experiences',
                            i,
                            key,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="button-wrapper">
              <button type="submit">Next Step</button>
            </div>
          </form>
        )}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit}>
            <div className="education data-group">
              <h2>Education</h2>
              {data.education.map((edu, i) => (
                <div className={`education-${i + 1}`} key={i}>
                  <h3>Education {i + 1}</h3>
                  {Object.entries(edu).map(([key, val]) => (
                    <div className={key} key={key}>
                      <label htmlFor={`${key}-${i}`}>{key}</label>
                      <input
                        type="text"
                        id={`${key}-${i}`}
                        value={val || ''}
                        onChange={(e) =>
                          handleInputChange('education', i, key, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="button-wrapper">
              <button type="submit">Next Step</button>
            </div>
          </form>
        )}
        {currentStep === 4 && (
          <form onSubmit={handleSubmit}>
            <div className="certificates data-group">
              <h2>Certificates</h2>
              {data.certificates.map((cert, i) => (
                <div className={`certificate-${i + 1}`} key={i}>
                  <h3>Certificate {i + 1}</h3>
                  {Object.entries(cert).map(([key, val]) => (
                    <div className={key} key={key}>
                      <label htmlFor={`${key}-${i}`}>{key}</label>
                      <input
                        type="text"
                        id={`${key}-${i}`}
                        value={val || ''}
                        onChange={(e) =>
                          handleInputChange(
                            'certificates',
                            i,
                            key,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="button-wrapper">
              <button type="submit">Next Step</button>
            </div>
          </form>
        )}
        {currentStep === 5 && (
          <form onSubmit={handleSubmit}>
            <div className="languages data-group">
              <h2>Languages</h2>
              {data.languages.map((lang, i) => (
                <div className={`language-${i + 1}`} key={i}>
                  <h3>Language {i + 1}</h3>
                  {Object.entries(lang).map(([key, val]) => (
                    <div className={key} key={key}>
                      <label htmlFor={`${key}-${i}`}>{key}</label>
                      <input
                        type="text"
                        id={`${key}-${i}`}
                        value={val || ''}
                        onChange={(e) =>
                          handleInputChange('languages', i, key, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="button-wrapper">
              <button type="submit">Next Step</button>
            </div>
          </form>
        )}
        {currentStep === 6 && (
          <form onSubmit={handleSubmit}>
            <div className="contacts data-group">
              <h2>Contacts</h2>
              {Object.entries(data.contacts).map(([key, val]) => (
                <div className={key} key={key}>
                  <label htmlFor={key}>{key}</label>
                  <input
                    type="text"
                    id={key}
                    value={val || ''}
                    onChange={(e) =>
                      handleInputChange('contacts', null, key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            <div className="button-wrapper">
              <button type="submit">Generate Your CV</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PersonDataForm;
