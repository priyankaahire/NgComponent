##Getting Started
InputText is applied to an input field with `<av-input></av-input>` component. it has two way binding.
##Sample Component
export class AvInputTextDemo() {
    public align: string = 'left';
    public width: string;
}
##Sample Template
 <av-input [align]="align" [width]="50" type="text" placeholder="Enter Name" ngDefaultControl></av-input>

 If input field is readonly
 <av-input readonly="readonly" [align]="align" [width]="width" type="text" placeholder="Enter Name" ngDefaultControl></av-input>


##Properties
| Name          | Type    | Default| Description                                                |---------------------------------------------------------------------------------------
| `align`       | string  | null   |   Set style align of text in `px`.
| `width`       | string  | null   |   Set style width of text in `px`.
| `type`        | string  | text   |   Type of the input e.g number, text, date
| `placeholder` | string  | null   |   Set placeholder to text input
| `readonly`    | string  | null   |   Set feild readonly after passing `readonly="readonly"`
|---------------|----------------------------------------------------------------------------

##Styling

| Name                     | Description
|--------------------------|----------------------------
| `av-ui-input`            | Input element.
|--------------------------|----------------------------
