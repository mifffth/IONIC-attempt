import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form";

describe('RegisterPageForm', () => {
    let registerPageForm: RegisterPageForm;
    let form: FormGroup;

    beforeEach(() => {
        registerPageForm = new RegisterPageForm(new FormBuilder());
        form = registerPageForm.getForm();
    })

    it('should empty name = invalid', () => {
        expect(form.get('name')!.valid).toBeFalsy(); //pake ! karena nama wajib diisi
    })

    it('should get email', () => {
        expect(form.get('email')!.valid).toBeFalsy();
    })

    it('should get password', () => {    
        expect(form.get('password')!.valid).toBeFalsy();  
    })

    it('should get repeatPassword', () => {    
        expect(form.get('repeatPassword')!.valid).toBeFalsy();  
    })

    it('should get phone', () => {    
        expect(form.get('phone')!.valid).toBeFalsy();  
    })

    it('should get street', () => {    
        expect(form.get('address.street')!.valid).toBeFalsy();  
    })

    it('should get number', () => {    
        expect(form.get('address')!.get('number')!.valid).toBeFalsy();  
    })

    it('should get complement', () => {    
        expect(form.get('address')!.get('complement')!.valid).toBeFalsy();  
    })

    it('should get zipcode', () => {    
        expect(form.get('address')!.get('zipcode')!.valid).toBeFalsy();  
    })

    it('should get state', () => {    
        expect(form.get('address')!.get('state')!.valid).toBeFalsy();  
    })

    it('should get city', () => {    
        expect(form.get('address')!.get('city')!.valid).toBeFalsy();  
    })

    it('invalid email = invalid', () => {    
       form.get('email')?.setValue('invalidEmail');

       expect(form.get('email')!.valid).toBeFalsy();
    })

    it('password less than 6 =invalid', () => {    
        form.get('password')?.setValue('12345');
        
        expect(form.get('password')!.valid).toBeFalsy();
     })

     it('password different from repeated password = invalid', () => {    
        form.get('password')!.setValue('anyPassword');
        form.get('repeatPassword')!.setValue('anotherPassword');
        
        expect(form.get('repeatPassword')!.valid).toBeFalsy();
     })

     it('should form be valid', () => {
        form.get('name')!.setValue('anyName');
        form.get('email')!.setValue('anyEmail');
        form.get('password')!.setValue('anyPassword');
        form.get('repeatPassword')!.setValue('anyPassword');
        form.get('phone')!.setValue('anyPhone');   
        form.get('address')!.get('street')!.setValue('anyStreet');  
        form.get('address')!.get('number')!.setValue('anyNumber');
        form.get('address')!.get('complement')!.setValue('anyComplement');
        form.get('address')!.get('zipcode')!.setValue('anyZipcode');
        form.get('address')!.get('state')!.setValue('anyState');
        form.get('address')!.get('city')!.setValue('anyCity');
         
        expect(form.valid).toBeTruthy();
})
})

    