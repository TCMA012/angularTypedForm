https://netbasal.com/typed-reactive-forms-in-angular-no-longer-a-type-dream-bf6982b0af28

We can define a type that maps a model to a strict form group. To demonstrate, here is a minimal version of my reactive forms library:

interface Profile {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string
  }
}

const profileForm = new FormGroup<ControlsOf<Profile>>({
  firstName: new FormControl('', { nonNullable: true }),
  lastName: new FormControl('', { nonNullable: true }),
  address: new FormGroup({
    street: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true })
  })
});

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
  ? FormGroup<ControlsOf<T[K]>>
  : FormControl<T[K]>;
};
