import React from 'react';
import './inputTag.css';

const InputTag = (props) => {
  var tagInput;
    // Using the State hook to declare our tags variable and setTags to update the variable.
    const [tags, setTags] = React.useState(props.value);

    React.useEffect(() => {
      setTags(props.value);
    }, [props.value]);
    
    const removeTag = (i) => {
      const newTags = [ ...tags ];
      newTags.splice(i, 1);
  
      // Call the defined function setTags which will replace tags with the new value.
      setTags(newTags);
      if(props.onChange)
        props.onChange(newTags);
    };
  
    const inputKeyDown = (e) => {
      const val = e.target.value;
      if (e.key === 'Enter' && val) {
        e.stopPropagation();
        e.preventDefault();
        if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
          return;
        }
        setTags([...tags, val]);
        if(props.onChange)
          props.onChange([...tags, val]);
        tagInput.value = null;
      } else if (e.key === 'Backspace' && !val) {
        removeTag(tags.length - 1);
      }
    };
  
  
    return (
      <div className="input-tag">
        <ul className="input-tag__tags">
          { tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => { removeTag(i); }}>+</button>
            </li>
          ))}
          <li className="input-tag__tags__input"><input type="text" onKeyDown={inputKeyDown} ref={c => { tagInput = c; }} /></li>
        </ul>
      </div>
    );
  }
  
export default InputTag;
  