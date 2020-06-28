//Storage Constroller
const StorageCtrl=(function(){
  return{
    storeItem: function(item){
      let items;
    //拿取时从string变为object
    if(localStorage.getItem('items')=== null){
      items =[];
      //Push new item
      items.push(item);
      //Set ls
      //保存时从object变为string
      localStorage.setItem('items',JSON.stringify(items));
    }else{
      items = JSON.parse(localStorage.getItem('items'));
      //Push new item
      items.push(item);
      //Set ls
      //保存时从object变为string
      localStorage.setItem('items',JSON.stringify(items));
    }
    },
    getItemsFromStorage:function(){
      let items;
      if(localStorage.getItem('items')=== null){
        items=[];
      }else{
        items=JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage:function(updateItem){
      let items=JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item,index){
        if(item.id===updateItem.id){
          items.splice(index,1,updateItem); //array中的删除——传入下标和个数
          //第三个参数为replace
        }
      });
      localStorage.setItem('items',JSON.stringify(items));
    },
    deleteItemFromStorage:function(id){
      let items=JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item,index){
        if(item.id===id){
          items.splice(index,1); //array中的删除——传入下标和个数
        }
      });
      localStorage.setItem('items',JSON.stringify(items));
    },
    clearItemsFromStorage:function(){
      localStorage.removeItem('items');
    }

  }
})();


//Item Controller
const ItemCtrl = (function(){   //自动运行
  //Item Constructor
  const Item = function(id,name,calories){
    this.id = id;
    this.name= name;
    this.calories = calories;
  } 
  //Data Structures /State
  const data={
    // items :[
    //   // {id:0, name:'Steak', calories:1200},
    //   // {id:1, name:'Cookies', calories:400},
    //   // {id:2, name:'Eggs', calories:300}
    // ],
    items:StorageCtrl.getItemsFromStorage(),
    currentItem:null,
    totalCalories:0
  }
  //Public methods
  return {
    getItems: function(){
      return data.items;
    },
    logData : function(){
      return data;
    },
    addItem:function(name,calories){
      let ID;
      //Create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length-1].id+1;
      }else{
        ID=0;
      }

      //Calories to number
      calories = parseInt(calories);  //传入为string，变为int

      //Create new item
      newItem = new Item(ID,name,calories);

      //Add to Items Array
      data.items.push(newItem);

      return newItem;
    },
    GettotalCalories:function(){
      let total =0;
      //Loop through items and add cals
      data.items.forEach(function(item){
        total+=item.calories;
      });

      //Set total cal in data structure
      data.totalCalories=total;

      return data.totalCalories;
    },
    getItemById:function(id){
      let found = null;
      //Loop through items
      data.items.forEach(function(item){
        if(item.id===id){
          found = item;
        }
      });
      return found;
    },
    setCurrentItem:function(item){
      data.currentItem=item;
    },
    getCurrentItem:function(){
      return data.currentItem;
    },
    updateItem:function(name,calories){  //update int the ds
      //Calories to number
      calories=parseInt(calories);

      let found = null;
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories=calories;
          found = item;
        }
      });
      return found;
    },
    deletItem:function(id){
      //Get ids
      const ids = data.items.map(function(item){  //map得到ids
        return item.id;
      });

      //Get index
      const index = ids.indexOf(id);

      //Remove item
      data.items.splice(index,1);  //删除下表为index的一个元素

    },
    ClearAllItems:function(){
      data.items=[];
    }
  }
})();

//UI Controller
const UICtrl = (function(){   //自动运行
  const UISelectors={
    itemList:'#item-list',
    addBtn:'.add-btn',
    itemNameInput:'#item-name',
    itemCaloriesInput:'#item-calories',
    totalCalories:'.total-calories',
    updateBtn:'.update-btn',
    deleteBtn:'.delete-btn',
    backBtn:'.back-btn',
    listItems:'#item-list li',
    clearBtn:'.clear-btn'
  }
  
  //Public methods
  return {
    populateItemList:function(items){
      let html = ``;
      items.forEach(function(item){
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>
        `;
      });
      //Insert list items
      document.querySelector(UISelectors.itemList).innerHTML=html;
    },
    getSelectors:function(){
      return UISelectors;
    },
    getItemInput: function(){
      return {
        name:document.querySelector(UISelectors.itemNameInput).value,
        calories:document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem:function(item){
      //Show the list
      document.querySelector(UISelectors.itemList).style.display='block';
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item';
      //Add ID
      li.id=`item-${item.id}`;
      //Add HTML
      li.innerHTML = `
      <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
      `;
      //Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement(`beforeend`,li);
    },
    clearInput:function(){
      document.querySelector(UISelectors.itemNameInput).value="";
      document.querySelector(UISelectors.itemCaloriesInput).value="";
    },
    hideList:function(){
      document.querySelector(UISelectors.itemList).style.display='none';
    },
    showTotalCalories:function(total){
      document.querySelector(UISelectors.totalCalories).textContent=total;
    },
    clearEditState:function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display='none';
      document.querySelector(UISelectors.deleteBtn).style.display='none';
      document.querySelector(UISelectors.backBtn).style.display='none';
      document.querySelector(UISelectors.addBtn).style.display='inline';
      //document.querySelector(UISelectors.itemList).style.display='none';
    },
    addItemToForm:function(){
      document.querySelector(UISelectors.itemNameInput).value=ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value=ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    showEditState:function(){
      document.querySelector(UISelectors.updateBtn).style.display='inline';
      document.querySelector(UISelectors.deleteBtn).style.display='inline';
      document.querySelector(UISelectors.backBtn).style.display='inline';
      document.querySelector(UISelectors.addBtn).style.display='none';
      document.querySelector(UISelectors.itemList).style.display='inline';
    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Node list 不能用foreach——转为array
      
      //Turn nodelist into array
      listItems = Array.from(listItems);
      listItems.forEach(function(listItem){
        const ItemID = listItem.getAttribute('id');
        if(ItemID === `item-${item.id}`){  //挑被修改的id改
          document.querySelector(`#${ItemID}`).innerHTML =`
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
          ` ;
        }
      })

    },
    deleteListItem:function(id){
      const itemID=`#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();  //删除该li
    },
    ClearItems:function(){
      let listItems = document.querySelector(UISelectors.listItems);
      
      //Turn Node list into array
      listItems = Array.from(listItems);  //转为array
      listItems.forEach(function(item){
        item.remove;
      })
    }
  }

})();

//App Controller
const App = (function(ItemCtrl,UICtrl,StorageCtrl){   //自动运行
  //Load event listeners
  const loadEventListeners = function(){
    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

    //Disable submit on enter
    document.addEventListener('keypress',function(e){
      if(e.keyCode === 13|| e.which ===13){    //若按下enter
        e.preventDefault();
        return false;
      }
    });

    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click',itemEditSubmit);

    //Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);

    //Back Button event
    document.querySelector(UISelectors.backBtn).addEventListener('click',function(e){
      UICtrl.clearEditState();
      e.preventDefault();
    });

    //Delete Button event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click',ItemDeleteSubmit);


    //Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click',ClearAllItems);

  }

  //Add item submit
  const itemAddSubmit = function(e){
    //Get form inpur from UI Controller
    const input = UICtrl.getItemInput();
    //Chech for name and calorie input
    if(input.name !== ""&&input.calories!==""){
      //Add item
      const newItem = ItemCtrl.addItem(input.name,input.calories);
      //Add item to UI list
      UICtrl.addListItem(newItem);

      //Get total calories
      const totalCalories = ItemCtrl.GettotalCalories();
      //Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //Store in local Storage 
      StorageCtrl.storeItem(newItem);   //存入LS

      //Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  //Click edit item
  const itemEditSubmit = function(e){
    if(e.target.classList.contains('edit-item')){  //event delegation
      //Get list item id (item-0,item-1)
      const listId = e.target.parentNode.parentNode.id;
      
      //Break into an array
      const listIdArr = listId.split('-');
      
      //Get the actual id
      const id = parseInt(listIdArr[1]);

      //Get item
      const itemToEdit = ItemCtrl.getItemById(id);
      
      //Set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      
      //Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  //Update item submit
  const itemUpdateSubmit=function(e){
    //Get item input
    const input = UICtrl.getItemInput();

    //Update item
    const updateItem = ItemCtrl.updateItem(input.name,input.calories);

    //Update UI
    UICtrl.updateListItem(updateItem);

    //Get total calories
    const totalCalories = ItemCtrl.GettotalCalories();
    //Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);


    //Update local storage
    StorageCtrl.updateItemStorage(updateItem);

    //返回添加界面
    UICtrl.clearEditState();

    e.preventDefault();
  }

  //Item Delete Submit
  const ItemDeleteSubmit = function(e){
    //Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    //delete from data structure
    ItemCtrl.deletItem(currentItem.id);

    //delete from UI
    UICtrl.deleteListItem(currentItem.id);

    //Get total calories
    const totalCalories = ItemCtrl.GettotalCalories();
    //Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    //Delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);


    //返回添加界面
    UICtrl.clearEditState();

    e.preventDefault();
  }

  //Clear items event
  const ClearAllItems = function(){
    //Delete all items from datastructure
    ItemCtrl.ClearAllItems();
    //Delete all items from UI
    UICtrl.ClearItems();

    //Get total calories
    const totalCalories = ItemCtrl.GettotalCalories();
    //Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    //Clear from local storage
    StorageCtrl.clearItemsFromStorage();

    
    //返回添加界面
    UICtrl.clearEditState();

    UICtrl.hideList();
  }

  //Public methods
  return {
    init: function(){
      //Clear edit state /set inital set
      UICtrl.clearEditState();

      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Check if any items
      if(items.length===0){
        UICtrl.hideList();
      }else{
        //Populate list with items
        UICtrl.populateItemList(items);
      }

      //Get total calories
      const totalCalories = ItemCtrl.GettotalCalories();
      //Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      

      //Load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl,UICtrl,StorageCtrl);

//Initialize App
App.init();