import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { photos } from "./Images";
import GalleryItem from "./GalleryItem";

const GalleryBody = () => {
  //useState Hooks
  const [images, setImages] = useState(photos);
  const [selected, setSelected] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  //Manage the Draging Index
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("index", index.toString());
    setDraggedIndex(index);
    setHoveredIndex(index);
  };

  //Manage the Draging over the Index
  const handleDragOver = (event, index) => {
    event.preventDefault();
    setHoveredIndex(index);
  };

  //Manage the Deoping Index
  const handleDrop = (event, index) => {
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(draggedIndex, 1);

    updatedImages.splice(hoveredIndex, 0, draggedImage);
    setDraggedIndex(null);
    setHoveredIndex(null);
  };
 //useEffect Hooks
  useEffect(() => {
    if (hoveredIndex !== draggedIndex) {
      const updatedImages = [...images];
      const [draggedImage] = updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(hoveredIndex, 0, draggedImage);
      setImages(updatedImages);
      setDraggedIndex(hoveredIndex);
    }
  }, [hoveredIndex, draggedIndex, images]); //passing parameter where it will change & updated if any parameter will change

  //TO Select The Individula image
  const handleSelect = (select, id) => {
    if (select) {
      setSelected([...selected, id]);
    } else {
      const newSelected = selected.filter((item) => item !== id);
      setSelected([...newSelected]);
    }
  };
  //To Delete Selected Items
  const handleDelete = () => {
    // eslint-disable-next-line array-callback-return
    const newItems = images.filter((item) => {
      if (!selected.includes(item.id)) {
        return item;
      }
    });
    setImages(newItems);
    setSelected([]);
  };

  return (
    <>
      <div className="flex justify-between py-4 border-b border-gray-800">
        {selected.length > 0 ? (
          <div>{selected.length} Files Selected</div>
        ) : (
          <div className="header font-bold">Gallery</div>
        )}

        {selected.length > 0 && (
          <div className="text-red-400 cursor-pointer" onClick={handleDelete}>
            Delete Files
          </div>
        )}
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
          {images.map((item, index) =>
            index === 0 ? (
              <div className="col-span-2 row-span-2 featured" key={item.id}>
                {/* passing first image information to the gallery */}
                <GalleryItem
                    id={item.id}
                    image={item}
                    index={index}
                    handleSelect={handleSelect}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                />
              </div>
            ) : (
              <div key={item.id}>
                {/* passing all Individula Image information for manage them */}
                <GalleryItem
                    id={item.id}
                    image={item}
                    index={index}
                    handleSelect={handleSelect}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                />
              </div>
            )
          )}
        </div>
      </DndProvider>
    </>
  );
};

export default GalleryBody;
