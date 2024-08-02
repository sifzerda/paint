// FontSelect.js

const FontSelect = ({ selectedFont, setSelectedFont }) => {
  return (
    <div className='font-selector'>
      <select
        id='font-select'
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}>

        <option value='Arial'>Arial</option>
        <option value='Arial Black'>Arial Black</option>
        <option value='Arial Narrow'>Arial Narrow</option>
        <option value='Arial Rounded MT Bold'>Arial Rounded MT Bold</option>
        <option value='Bookman Old Style'>Bookman Old Style</option>
        <option value='Bradley Hand'>Bradley Hand</option>
        <option value='Brush Script MT'>Brush Script MT</option>
        <option value='Calibri'>Calibri</option>
        <option value='Cambria'>Cambria</option>
        <option value='Candara'>Candara</option>
        <option value='Century Gothic'>Century Gothic</option>
        <option value='Comic Sans MS'>Comic Sans MS</option>
        <option value='Consolas'>Consolas</option>
        <option value='Constantia'>Constantia</option>
        <option value='Corbel'>Corbel</option>
        <option value='Courier'>Courier</option>
        <option value='Courier New'>Courier New</option>
        <option value='Franklin Gothic Medium'>Franklin Gothic Medium</option>
        <option value='Gabriola'>Gabriola</option>
        <option value='Garamond'>Garamond</option>
        <option value='Georgia'>Georgia</option>
        <option value='Gill Sans MT'>Gill Sans MT</option>
        <option value='Goudy Old Style'>Goudy Old Style</option>
        <option value='Harrington'>Harrington</option>
        <option value='Helvetica'>Helvetica</option>
        <option value='Helvetica Neue'>Helvetica Neue</option>
        <option value='High Tower Text'>High Tower Text</option>
        <option value='Impact'>Impact</option>
        <option value='Jokerman'>Jokerman</option>
        <option value='Lucida Bright'>Lucida Bright</option>
        <option value='Lucida Calligraphy'>Lucida Calligraphy</option>
        <option value='Lucida Console'>Lucida Console</option>
        <option value='Lucida Fax'>Lucida Fax</option>
        <option value='Lucida Handwriting'>Lucida Handwriting</option>
        <option value='Lucida Sans'>Lucida Sans</option>
        <option value='Lucida Sans Typewriter'>Lucida Sans Typewriter</option>
        <option value='Lucida Sans Unicode'>Lucida Sans Unicode</option>
        <option value='Marlett'>Marlett</option>
        <option value='Microsoft Sans Serif'>Microsoft Sans Serif</option>
        <option value='Modern No. 20'>Modern No. 20</option>
        <option value='Monotype Corsiva'>Monotype Corsiva</option>
        <option value='MS Gothic'>MS Gothic</option>
        <option value='MS UI Gothic'>MS UI Gothic</option>
        <option value='MS Outlook'>MS Outlook</option>
        <option value='MS Sans Serif'>MS Sans Serif</option>
        <option value='MS Serif'>MS Serif</option>
        <option value='MV Boli'>MV Boli</option>
        <option value='OCR A Extended'>OCR A Extended</option>
        <option value='Palatino Linotype'>Palatino Linotype</option>
        <option value='Papyrus'>Papyrus</option>
        <option value='Perpetua'>Perpetua</option>
        <option value='Roboto'>Roboto</option>
        <option value='Rockwell'>Rockwell</option>
        <option value='Segoe Print'>Segoe Print</option>
        <option value='Segoe Script'>Segoe Script</option>
        <option value='Segoe UI'>Segoe UI</option>
        <option value='Segoe UI Light'>Segoe UI Light</option>
        <option value='Segoe UI Semibold'>Segoe UI Semibold</option>
        <option value='Segoe UI Symbol'>Segoe UI Symbol</option>
        <option value='Tahoma'>Tahoma</option>
        <option value='Times New Roman'>Times New Roman</option>
        <option value='Trebuchet MS'>Trebuchet MS</option>
        <option value='Tw Cen MT'>Tw Cen MT</option>
        <option value='Verdana'>Verdana</option>
        <option value='Webdings'>Webdings</option>
        <option value='Wingdings'>Wingdings</option>

      </select>
    </div>
  );
};

export default FontSelect;