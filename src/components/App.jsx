import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { MainTitle } from './MainTitle/MainTitle';
import { Subtitle } from './Subtitle/Subtitle';
import { Container } from './Container/Container.styled';


export class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  addContact = contact => {
    if (
      this.state.contacts.some(
        el => el.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      Notiflix.Notify.failure(`${contact.name} is already in contacts`);
      return;
    }
    const finalContact = {
      id: nanoid(),
      ...contact,
    };

    this.setState(prevState => ({
      contacts: [finalContact, ...prevState.contacts],
    }));
  };

  handleFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase())
    );
    return (
      <Container>
        <MainTitle title="Phonebook" />
        <ContactForm onAddContact={this.addContact} />
        <Subtitle subtitle="Contacts" />
        <Filter onFilterChange={this.handleFilter} valueToFilter={filter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}