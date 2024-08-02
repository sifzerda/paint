// FontSelect.js

const FontSelect = ({ selectedFont, setSelectedFont }) => {
  return (
    <div className='font-selector'>
      <select
        id='font-select'
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
      >
        <option value='Arial'>Arial</option>
        <option value='Courier New'>Courier New</option>
        <option value='Georgia'>Georgia</option>
        <option value='Roboto'>Roboto</option>
        <option value='Tahoma'>Tahoma</option>
        <option value='Times New Roman'>Times New Roman</option>
        <option value='Verdana'>Verdana</option>
      </select>
    </div>
  );
};

export default FontSelect;