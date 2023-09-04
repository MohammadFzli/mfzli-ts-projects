import "./style.css"
const app =document.querySelector<HTMLDivElement>("#app");

type BoxProps ={
  element:string;
  attr?:any;
  children: string | string[] | Element | Element[];
};
const Box =(props:BoxProps)=>{
  const el = document.createElement(props.element);

  if(props.attr)
  Object.keys(props.attr).forEach((key:string) =>{
  el[key] = props.attr[key];
});

  if (!Array.isArray(props.children)) el.append(props.children!);
  else el.append(...props.children);
  return el;
};
// <div class="bg-black border-spacing-2 text-white rounded"><div>

app!.append(
  Box({
    element: "div",
    attr:{
      className: "fixed bottom-[-100%] transition-all left-0 right-0 z-40 w-full p-4 overflow-y-auto bg-white transform-none",
      id:"contactListDrawer",
      tabindex:"-1",
      ariaLabelledby:"drawer-bottom-label",
     }, 
    children:[
        Box({
          element:"h5",
          attr:{
            id:"drawer-bottom-label",
            className:"inline-flex items-center mb-4 text-base font-semibold text-gray-500",
          },
          children:"contact Lists"}),
        Box({
          element:"button",
          attr:{
            id:"closeDrawerButton", type:"button",
            ariaControls:"drawer-bottom-example",
            className:"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center",
          },
          children:Box({element:"span",attr:{className:"bg-black border-spacing-2 text-white rounded"}, children:"Close menu"})}),
        Box({element:"ul", attr:{id:"contact-list", className:"flex flex-col list-none"}, children:""}),
      ],
})
);
app!.append(
  Box({
    element: "div",
    attr:{
      className:"container px-2 py-3 flex h-screen w-full justify-center items-center",
     }, 
    children:[
        Box({
          element:"form",
          attr:{
            className:"grid",
          },children:[
            Box({
              element:"div",
              attr:{
              className:"w-full mx-auto bg-gradient-to-r bg-white p-2 sm:p-6 flex justify-center gap-4",
              },children:[
                  Box({
                    element:"img",
                    attr:{
                      alt:"", src:"./src/cuteMonster.avif", className:"rounded-full p-1 ring-2 ring-gray-300 w-10 h-10 bg-gray-100 text-gray-600"
                    },children:"",}),
                 ],}),
            Box({
              element:"div",
              attr:{
              className:"mb-6",
              },children:[
                  Box({
                    element:"label",
                    attr:{
                      for:"base-input", className:"block mb-2 text-sm font-medium text-gray-900",
                    },children:"Contact Name",}),
                  Box({
                    element:"input",
                    attr:{
                      type:"text",
                      for:"base-input",
                      className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                      id:"contactName",},children:"",}),],}),
            Box({
              element:"div",
              attr:{
              className:"mb-6",
              },children:[
                  Box({
                    element:"label",
                    attr:{
                      for:"base-input", className:"block mb-2 text-sm font-medium text-gray-900",
                    },children:"Phone Number",}),
                  Box({
                    element:"input",
                    attr:{
                      type:"text",
                      for:"base-input",
                      className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                      id:"phoneNumber",},children:"",}),],}),
                      Box({
                        element:"div",
                        attr:{
                        className:"flex justify-between mb-4",
                        },children:[
                      Box({
                        element:"div",
                        attr:{
                        className:"flex items-center",
                        },children:[
                            Box({
                              element:"input",
                              attr:{
                                id:"SIMStorage", type:"radio", value:"", name:"default-radio", className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500",
                              },children:"Phone Number",}),
                            Box({
                              element:"lable",
                              attr:{
                                for:"default-radio-1", className:"ml-2 text-sm font-medium text-gray-900",},
                                children:"SIM",}),],}),
                                Box({
                                  element:"div",
                                  attr:{
                                  className:"flex items-center",
                                  },children:[
                                      Box({
                                        element:"input",
                                        attr:{
                                          id:"deviceStorage", type:"radio", value:"", name:"default-radio", className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500",
                                        },children:"Phone Number",}),
                                      Box({
                                        element:"lable",
                                        attr:{
                                          for:"default-radio-2", className:"ml-2 text-sm font-medium text-gray-900",},
                                          children:"Device",}),],}),]}),
                                          Box({element:"button",
                                        attr:{id:"submitButton", type:"button", className:"focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                        },children:"Show"}),
                                        Box({element:"button",
                                        attr:{id:"showContactsButton",type:"button", className:" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
                                        },children:"Show Contacts"}),
 ],}),],}),);

 type ContactProps = {
  id:string | number;
  contactName:string;
  PhoneNumber:string;
  storage:"SIM" | "Device";
  avatar:string | null;

};

type ContactListType = ContactProps[];

type contactInfoType ={
  contactName:string;
  PhoneNumber:string|number;
}

const contactNameInput = document.querySelector<HTMLInputElement>("#contactName");
const phonNumberInput = document.querySelector<HTMLInputElement>("#phoneNumber");
const deviceStorageInput = document.querySelector<HTMLInputElement>("#deviceStorage");

const contactListElement = document.querySelector<HTMLUListElement>("#contact-list");

const submitButton = document.querySelector<HTMLButtonElement>("#submitButton");
const showContactsButton = document.querySelector<HTMLButtonElement>("#showContactsButton");

const contactListDrawer = document.querySelector<HTMLButtonElement>("#contactListDrawer");
const closeDrawerButton = document.querySelector<HTMLButtonElement>("#closeDrawerButton");


const contactList: ContactListType =[];

const validateFields = (...fields: string[]) => {
  return fields.every(fields => !!(fields).toString() );
 
};

const createListItem = (contactInfo:contactInfoType):HTMLLIElement => {
  const listItem = document.createElement("li");
  listItem.style.backgroundColor="#dfd0f7";
  listItem.className = "py-4 px-2 mb-2 rounded-lg";

  const contactNameElement = document.createElement("h2");
  contactNameElement.className = "text-slate-700";
  contactNameElement.innerText = contactInfo.contactName;
  const contactPhoneNumberElement = document.createElement("p");
  contactPhoneNumberElement.className = "text-slate-500";
  contactPhoneNumberElement.innerText = contactInfo.PhoneNumber.toString();
  
  listItem.appendChild(contactNameElement);
  listItem.appendChild(contactPhoneNumberElement);
  
  
  return listItem;
};

const showContactsButtonHandler =  () => {
  contactListDrawer?.classList.remove("bottom-[-100%]");
  contactListDrawer?.classList.add("bottom-[0%]");
};

const closeDrawerButtonHandler =  () => {
  contactListDrawer?.classList.remove("bottom-[0%]");
  contactListDrawer?.classList.add("bottom-[-100%]");
};

const validateCreatContact = (contactInfo: contactInfoType) => {
  if(!validateFields(contactInfo.contactName, contactInfo.PhoneNumber + "")){
      alert('Fill All Firlds')
      throw Error('Fill All Firlds')
   };
}

const submitButtonHandler =  () => {

  validateCreatContact({
      contactName:contactNameInput!.value,
      PhoneNumber:phonNumberInput!.value,
  });

  const newContact:ContactProps = {
      id: crypto.randomUUID(),
      contactName:contactNameInput?.value ?? '',
      PhoneNumber:phonNumberInput?.value ?? '',
      avatar:null,
      storage:deviceStorageInput?.checked ?  "Device" : "SIM"  ,
  };
  contactList.push(newContact);
  
  const listItem = createListItem({
      contactName: newContact.contactName,
      PhoneNumber: newContact.PhoneNumber,
  });

  contactListElement?.appendChild(listItem);
  
  };



showContactsButton?.addEventListener("click", showContactsButtonHandler);
closeDrawerButton?.addEventListener("click", closeDrawerButtonHandler);
submitButton?.addEventListener("click", submitButtonHandler);