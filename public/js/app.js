'use strict';

const contacts = [];

let nextId = 0;

const main = new Vue({
    el: '#vue',
    data: {
        idContact: 0,
        idForm: 0,
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
    }
});