/// <reference types="cypress" />

describe('Todoist',()=>{

    it('Tasks',()=>{

        cy.request({
            method:'POST',
            url:Cypress.config().baseUrlForTasks,
            body:{
                "content": "Buy Milk", 
                "due_string": "tomorrow at 12:00", 
                "due_lang": "en", 
                "priority": 4
            },
            auth: {
                'bearer': Cypress.env('token')
              }

        }).then(res=>{
            cy.log(res)
           const id=res.body.id
            cy.log(id)
            expect(res.status).to.eq(200)
            expect(res.body.content).to.eq('Buy Milk')

            cy.request({
                method:'POST',
                url:Cypress.config().baseUrlForTasks+'/'+id,
                body:{
                    "content": "Buy Coffee",
                    "due_string": "tomorrow at 12:00", 
                    "due_lang": "en", 
                    "priority": 4
                },
                auth: {
                    'bearer': Cypress.env('token')
                }

            }).then(res=>{
                cy.log(res)
                expect(res.status).to.eq(204)
            })

            cy.request({
                method:'POST',
                url:Cypress.config().baseUrlForTasks+'/'+id,
                body:{
                    "content": "Buy Coffee",
                    "due_string": "tomorrow at 12:00", 
                    "due_lang": "en", 
                    "priority": 4,
                     'due':{
                        'date':'2022-09-01'
                   }
                },
                auth: {
                    'bearer': Cypress.env('token')
                }
            }).then(res=>{
                cy.log(res)
                expect(res.status).to.eq(204)
            })

            cy.request({
                method:'POST',
                url:Cypress.config().baseUrlForTasks+'/'+id+'/close',
              
                auth: {
                    'bearer': Cypress.env('token')
                }
            }).then(res=>{
                cy.log(res)
                expect(res.status).to.eq(204)
            })
            
            cy.request({
                method:'POST',
                url:Cypress.config().baseUrlForTasks+'/'+id+'/reopen',
                
                auth: {
                    'bearer': Cypress.env('token')
                }
            }).then(res=>{
                cy.log(res)
                expect(res.status).to.eq(204)
            })

            cy.request({
                method:'DELETE',
                url:Cypress.config().baseUrlForTasks+'/'+id,
                
                auth: {
                    'bearer': Cypress.env('token')
                }
            }).then(res=>{
                cy.log(res)
                expect(res.status).to.eq(204)
                expect(res.body).to.eq('')
            })

        })
    })

    it("Labels",()=>{
        cy.request({
            method:'POST',
            url:Cypress.config().baseUrlForLabels,
            body:{
                "name": "Food"
            },
            auth: {
                'bearer': Cypress.env('token')
            }
        }).then(res=>{
            cy.log(res)
           const idLabel=res.body.id
           expect(res.status).to.eq(200)
           expect(res.body.name).to.eq('Food')
    
            cy.request({
                method:'POST',
                url:Cypress.config().baseUrlForLabels+'/'+idLabel,
                body:{
                    "name": "Drinks"
                },
                auth: {
                    'bearer': Cypress.env('token')
                }
            }).then(res=>{
                cy.log(res)
                expect(res.status).to.eq(204)
            })
    
    
            cy.request({
                method:'DELETE',
                url:Cypress.config().baseUrlForLabels+'/'+idLabel,
                auth: {
                    'bearer': Cypress.env('token')
                }
            }).then(res=>{
                cy.log(res)
                expect(res.status).to.eq(204)
                expect(res.body).to.eq('')
            })
        })
    })
    


      
})