import classNames from 'classnames';
import React, { useState,useRef, useEffect } from 'react';

const ChipComponent = () => {
  const [items, setItems] = useState([
    'Awanish',
    'Rahul',
    'Shyam',
    'Shiva',
    'Satyam',
    'Pintu'
    // Add more items as needed
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedChips, setSelectedChips] = useState([]);
  const [highlight,sethighlight]=useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const wrapperRef = useRef(null);


  const handleOutsideClick = (event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      //console.log('hitting outside device');
      setIsInputFocused(false);
    }
  };

  useEffect(() => {
      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
  }, []);

  const handleInputFocus = () => {

    setIsInputFocused(true);
  };

  const handleInputBlur = (event) => {
    console.log(event)
    
    setIsInputFocused(false);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value.key);
    setInputValue(event.target.value);
    
  };
  
  function handlehighlight(event)
  {
    //console.log(event.code);
    if(event.code==='Backspace' && highlight===-1)
    {
      sethighlight((selectedChips.length)-1);
    }
    else if(event.code==='Backspace' && highlight!==-1)
    {
      setItems([...items,...selectedChips.filter((chips,index) => index === highlight)]);
      setSelectedChips(selectedChips.filter((chip,index)=>index!==highlight))
      sethighlight(-1);
    }
  }
  
  function addchip(chip){
    //console.log(event.target.value);
    if(chip!=='')
    {
    setSelectedChips(selectedChips=>{ return [...selectedChips,chip]});
    //console.log(selectedChips);
    setItems(items.filter((i) => i !== chip));
    setInputValue('');
    }
  }

  function removeItem(chip)
  {
    setItems([...items,chip]);
    setSelectedChips(selectedChips.filter((c,index) => c !== chip));
  }
  return (
    <div className="chip-container relative w-full h-14 shadow-md m-5 mr-5 flex flex-row items-center">
      <div className='flex flex-row '>
      {selectedChips.map((chip,index)=>
        <div key={index} className={classNames('h-10 w-auto m-2 rounded-lg px-5 py-2 flex flex-row',highlight===index?'bg-amber-100':'bg-red-100','shadow-md')} >
            <div>{chip}</div>
            <div className='ml-3 bold cursor-pointer' onClick={()=>removeItem(chip)}>X</div>
      </div>)
      }
      </div>
      <div className='ml-5 relative'>
      <div className='h-50'>
        <input 
            placeholder="Click Here to add!!!" 
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handlehighlight}
            onFocus={handleInputFocus}
            className=' w-50 px-2'
            ref={wrapperRef}
        />
        
        <div className='absolute mt-5 bg-blue-100 w-40'>
        {isInputFocused && (items
          .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
          .map((item, index) => (
            <div key={index} className='h-10 w-auto m-2 rounded-lg px-5 py-2 flex flex-row items-center md-5 pt-5 px-5 pd-5 hover:bg-red-100' onClick={() => addchip(item)}>
              {item}
            </div>
          )))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ChipComponent;
