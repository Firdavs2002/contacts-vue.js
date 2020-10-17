'use strict';

const contacts = [];

let nextId = 0;

const main = new Vue({
    el: '#vue',
    data: {
        searchQuery: null,
        idContact: 0,
        idForm: 0,
        editer: false,
        nextId,
        contacts,
        contact: {},

        addInputs: { // счётчик полей ввода
            phone: [], ip: 1,
            address: [], id: 1,
            email: [], im: 1,
        },
    },
    methods: {
        addInputPhone() {
            this.addInputs.phone.push(++this.addInputs.ip);
            this.refresh('phone');
        },

        addInputAddress(){
            this.addInputs.address.push(this.addInputs.id++);
            this.refresh('address');
        },

        addInputEmail(){
            this.addInputs.email.push(this.addInputs.im++);
            this.refresh('email');
        },
        
        delNewInputPhone(e) {
            this.addInputs.phone.splice(e.target.id, 1);
            this.addInputs.ip--;
            this.refresh('phone');
        },
        
        delNewInputAddress(e) {
            this.addInputs.address.splice(e.target.id, 1);
            this.addInputs.ip--;
            this.refresh('address');
        },
        
        delNewInputEmail(e) {
            this.addInputs.email.splice(e.target.id, 1);
            this.addInputs.ip--;
            this.refresh('email');
        },
        addEddInputPhone() {
            this.contact.phones.push('');
        },                
        
        addEddInputAddress() {
            this.contact.addresses.push('');
        },                
        addEddInputEmail() {
            this.contact.emails.push('');
        },                
        
        delInputPhone(e) {
            this.contact.phones.splice(e.target.id, 1);
        },
        delInputAddress(e) {
            this.contact.addresses.splice(e.target.id, 1);
        },

        delInputEmail(e) {
            this.contact.emails.splice(e.target.id, 1);
        },

        delContact(e) {
            const id = e.target.id;
            this.nextId = id-1;
            this.contacts.splice(e.target.id-1, 1);
            for (let i = 1; i <= this.contacts["length"]; i++) {
                this.contacts[i-1].id = i;
            }
        },

        refresh(t) {
            for (let i = 1; i <= this.addInputs[t]["length"]; i++) {
                this.addInputs[t][i-1] = i+1;
            }
        },

        checkForm(e) {
            const form = e.target;
            const formData = new FormData(form);
            
            const name = form.querySelector("input[name='name']").value;

            const contact = {
                id: ++this.nextId,
                name,
                phones: [],
                addresses: [],
                emails: [],
            };
            
            for(let input of formData.entries()) {
                if (input[0][0] == 'p') {
                    contact.phones.push(input[1])
                }
                
                else if (input[0][0] == 'a') {
                    contact.addresses.push(input[1])
                }
                
                else if (input[0][0] == 'e') {
                    contact.emails.push(input[1])
                }
                
                console.log(input[0], input[1]); //Выведет в консоль всю форму в виде "КЛЮЧ ЗНАЧЕНИЕ"
            }
            contact.id.toString();
            this.contacts.push(contact);
            form.reset();
            
            this.addInputs = {
                phone: [], ip: 0,
                address: [], id: 0,
                email: [], im: 0,
            }
            e.preventDefault();
        },

        editContact(e) {
            let idContact = e.target.id
            idContact = idContact[idContact.length - 1]
            this.idContact = idContact;
            this.idForm = idContact;
            
            this.contact = contacts.find(o => o.id == idContact)            
        },

        checkEdit(e) {
            const form = e.target;
            const formData = new FormData(form);
            const name = form.querySelector('input[name="name"').value;
            
            const contact = {
                id: this.idContact,
                name,
                phones: [],
                addresses: [],
                emails: [],
            };

            for(let input of formData.entries()) {
                if (input[0][0] == 'p') {
                    contact.phones.push(input[1])
                }
                
                if (input[0][0] == 'a') {
                    contact.addresses.push(input[1])
                }
                
                if (input[0][0] == 'e') {
                    contact.emails.push(input[1])
                }
                
                console.log(input[0], input[1]); //Выведет в консоль всю форму в виде "КЛЮЧ ЗНАЧЕНИЕ"
            }
            this.editer = true;
            this.contact = contact
            e.preventDefault();
        },

        resetForm(e) {
            const id = e.target.id;
            let i = 1;
            let j = 1;
            let k = 1;
            const formId = this.contacts.find(i => i.id == id);
            const form = document.querySelector(`form.form-${formId.id}`);
            const formData = new FormData(form);

            for(let input of formData.entries()) if (input[1] == '') this.contacts[id-1].phones.splice(i, 1); i++;
            for(let input of formData.entries()) if (input[1] == '') this.contacts[id-1].addresses.splice(j, 1); j++;
            for(let input of formData.entries()) if (input[1] == '') this.contacts[id-1].emails.splice(k, 1); k++;
        },
    },

    computed: {
        resultQuery(){
            if(this.searchQuery){
                return this.contacts.filter((item)=>{
                    return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                })
            }else{
                return this.contacts;
            }
        }
    },

    watch: {
        editer: function() {
            if (this.editer) {
                this.editer = false;
                this.contacts[this.contact.id-1] = this.contact
            }
        },
    },
});