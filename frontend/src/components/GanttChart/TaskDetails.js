.task-details-sidebar {
  position: fixed;
  top: 105px;
  right: 0;
  width: 500px;
  height: calc(100vh - 105px); 
  background-color: #fff;
  box-shadow: -2px 5px 2px rgba(0, 0, 0, 0.3); 
  z-index: 9999;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

}

.task-details-header {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.icon-button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center; 
}

.task-title-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 12px;
  margin-right: 10px;
  flex-shrink: 0;
  margin-bottom: 20px;
}

.task-details-content {
  margin-left: 10px;
  margin-right: 10px;
}

.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 15px;
  flex-shrink: 0;
}

.task-title {
  margin: 0;
  font-size: 30px;
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.color-option {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
}

.task-details-body {
  flex: 1;
  padding: 10px;
  max-height: 200px;
}

.task-details-footer {
  padding: 10px;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
  position: relative;
  bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: auto;
}

.close, .edit-button, .delete-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  margin-left: 10px;
}

.close {
  color: #333;
}

.edit-button {
  color: #333; 
}

.delete-button {
  color: #333; 
}

.dropdown {
  margin: 10px 0;
  margin-top: -20px;
  flex-shrink: 0;
}

#todoDropdown {
  margin-left: 20px; 
  display: inline-block;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
}

#placeHolderDivDetails {
  height: 20px;
}

.color-picker {
  position: absolute;
  background-color: white;
  border-radius: 5px;
  width: 215px;
  margin-left: 20px;
  box-shadow: -1px 3px 8px rgba(0, 0, 0, 0.3);
  margin-top: 90px;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.color-circle:hover {
  outline: 2px solid #7AA7B7; 
  outline-offset: 3px; 
  cursor: default;
}

.color-option:hover {
  outline: 2px solid #7AA7B7; 
  outline-offset: 3px; 
}

.form-control-color {
  align-items: center;
  justify-content: center;
}

#description {
  border-radius: 5px;
  max-height: 100px;
  overflow-y: auto;
  height: 100px;
  padding-bottom: 30px;
  margin-top: 6px;
  font-size: 15px;
  margin-left: 10px;
  margin-right: 10px;
  color: #737373;
}

#title-text {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: -2px;
  margin-left: -6px;
  font-size: 30px; 
  font-weight: 500;
  margin-bottom: -2px;
}

.date-container {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
}

#description-title {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 25px;
}

#details-container {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 20px;
}

#details-header {
  border-bottom: 1px solid #ddd;
  padding: 5px;
  font-size: 18px;
  text-align: center;
}

#details-content {
  padding: 10px;
}

#details-content p {
  margin: 5px 0;
}

.details {
  position: relative;
  border: 1px solid lightgrey;
  margin-top: 10px;
  border-radius: 5px;
}

.details-header {
  padding: 5px;
  border-bottom: 1px solid lightgrey;
  text-align: center;
}

.details-body {
  padding: 10px;
}


textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
}

input[type="text"] {
  width: calc(100% - 20px);
  padding: 5px;
  margin: 10px 10px 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select[multiple] {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
}

.done-button {
  position: fixed;
  bottom: 15px;
  right: 22px;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: auto;
  cursor: pointer;
  border-radius: 5px;
}

.done-button:hover {
  background-color: #45a049;
}

.checkbox-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.checkbox-list div {
  display: flex;
  align-items: center;
}

.checkbox-list input {
  margin-right: 5px;
}

#placeholder-temp {
  height: 10px;
}

.color-circle.clickable {
  cursor: pointer;
}
