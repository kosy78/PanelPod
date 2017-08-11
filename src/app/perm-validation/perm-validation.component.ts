import { Component, OnInit, ViewChild, ElementRef, Pipe, Injectable, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'perm-validation',
  templateUrl: './perm-validation.component.html',
  styleUrls: ['./perm-validation.component.scss']
})

export class PermValidationComponent implements OnInit {

  complexForm: FormGroup;

  @ViewChild('form_container') form_container: ElementRef;
  @ViewChild('selected_people') selected_people: ElementRef;


  loadData(data) {
    this.form_container.nativeElement.innerHTML = data;
  }

  formOptions() {
    let formOptions = {
      view: false,
      edit: false,
      submit: false,
      reset: false,
      assign: false
    }
    return formOptions
  }

  people = ['jack.eric', 'alexa', 'sam']
  peoplearray = [];
  optionsArray;
  jsonOutput = {};

  callType(value) {
    this.selectedPeople(value)
  }

  constructor(fb: FormBuilder) {
    const that = this;
    this.complexForm = fb.group({
      profile_name: null,
      people: null,
      admin: false,
      submission_flow: fb.group({
        submission: fb.group(that.formOptions()),
        assign_priority: fb.group(that.formOptions()),
        qa_status: fb.group(that.formOptions()),
        nmi: fb.group(that.formOptions()),
        pm_review_status: fb.group(that.formOptions()),
      }),
      incident: fb.group({
        incident: fb.group(that.formOptions()),
        assign_priority: fb.group(that.formOptions()),
        urgent_task: fb.group(that.formOptions()),
        qa_status: fb.group(that.formOptions()),
        nmi: fb.group(that.formOptions()),
        pm_review_status: fb.group(that.formOptions()),
      }),
      post_lunch_flow: fb.group({
        assign_priority: fb.group(that.formOptions()),
        qa_review_status: fb.group(that.formOptions()),
        manager_validation: fb.group(that.formOptions()),
        additional_post_lunch_review: fb.group(that.formOptions()),
      }),
    })
  }

  selectedPeople(data) {
    const that = this;
    if (this.peoplearray.indexOf(data) == -1) {
      this.peoplearray.push(data)
      this.complexForm.patchValue({ people: this.peoplearray });
      this.selected_people.nativeElement.insertAdjacentHTML('beforeend', "<span class='people_square' style='padding: 1rem; background-color:#bfe0f3;margin: .5rem;'>" + data + "</span>")
      let people_square = document.querySelectorAll('.people_square')

      Array.prototype.forEach.call(people_square, function(el, i) {
        el.addEventListener('click', function() {
          const el_text = el.textContent;
          if (that.peoplearray.indexOf(el_text) > -1) {
            that.peoplearray.splice(el_text, 1);
          }
          el.remove();

        })
      });


    }
  }

  open_modal(item) {
    let modal_container = document.querySelector('#modal-container');
    let body = document.querySelector('body');
    var buttonId = item.getAttribute('id');
    modal_container.removeAttribute('class');
    modal_container.classList.add(buttonId)
    body.classList.add('modal-active')
  }

  close_modal(item) {
    let body = document.querySelector('body');
    item.classList.add('out')
    body.classList.remove('modal-active')
    document.querySelector('#perm_submit').classList.remove('submited')
  }

  submitForm(value: any) {
    this.jsonOutput = value.value;
    console.log(this.jsonOutput)
    this.loadData(this.transform(value.value))
    let button = document.getElementById('perm_submit')
    button.classList.add('submited');
    let modal_button = document.querySelector('.button')
    this.open_modal(modal_button)
  }

  transform(val) {
    return JSON.stringify(val, null, 10)
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br/>');
  }

  ngOnInit() {
    const that = this;
    const form = this.complexForm;
    this.optionsArray = Object.keys(this.formOptions())
    document.querySelector('.button').addEventListener('click', function() {
      that.open_modal(this)
    })
    let modal = document.querySelector('#modal-container')
    modal.addEventListener('click', function() {
      that.close_modal(this)
    });

    window.setTimeout(function() {
      let checkbox = document.querySelectorAll('.checkbox-inline input')
      if (checkbox) {

        for (let a in checkbox) {

          if (checkbox[a]) {
            var checkboxValue = checkbox[a].getAttribute("value");
            if (checkboxValue === 'submit') {
              checkbox[a].setAttribute("disabled", "true");
            }

          }
        }
      }
    }, 1000)

  }

}
