import { Pipe, PipeTransform } from '@angular/core';  
@Pipe({name: 'RemoveSpecialCharacters'}) 

export class RemoveSpecialCharactersPipe implements PipeTransform { 
   transform(value): string { 
       return value.replace(/\*/g,'');
   } 
} 