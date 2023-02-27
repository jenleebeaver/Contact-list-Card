import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'


// 5. add search query to input and filter contacts based on search query 
function ContactList(props){
  const {contacts, isLoading} = props;
  // q is set by the input value anytime the user types in the search box 
  const [q, SetQ] = React.useState('');
  console.log(q);
  
  return (
    <div className="card-bkg">
      <section className="search-bkg">
        <input type="text" placeholder="Search for a person using first name" value={q} onChange={(e) => SetQ(e.target.value)} />
      </section>
      <div className="list-container">
        <ul>
        {contacts.filter(contact => {
        if (q === '') {
          return contact;
        } else if (contact.firstName.toLowerCase().includes(q.toLowerCase())) {
            return contact;
          }
          }).map(contact => (
          <li key={contact.id}>
            <div className="container">
              <div className="circle">
                <img src={contact.image}  width="64" height="64"/>
              </div>
              <div className="content">
                 <h1>{contact.firstName} {contact.lastName}</h1>
                 <p>{contact.email}</p>
              </div>
            </div>
          </li>
        ))}
       </ul>
      </div>
    </div>
  )
}

// JSX: close bracket /> is calling the function 
// They don't necessarily need to take props
// This one also has an explicit return

// 1. Create a function that fetches data from our API
// 2. Use useState() in our fetch function to set and get our contacts from our API. This is where we are storing our data in React.
// 3. Use useEffect() to create a function that fetches our contact data from our external api 
// 4. map through the data to render a list of contacts. Doing this in ContactList Component. 
const App = () => {
  const [contacts, setContacts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  
  React.useEffect(() => {
    async function getContacts() {
      setIsLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const json = await response.json();
      setContacts(json.users);
      setIsLoading(false);
    }
    getContacts();
  }, []);
  
    return(
        isLoading ? "Loading ..." :
       <ContactList contacts={contacts} isLoading={isLoading} />
    );
}

//renders root 
ReactDOM.render(<App />,
document.getElementById("root"))
