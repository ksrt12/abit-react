interface IDefs {
    dis: boolean,
    LN?: string,
    FN?: string,
    MN?: string,
    BD?: string;
}

interface IDefaultInput {
    id: string;
    label: string;
    type: string;
    def?: string;
    placeholder?: string;
    maxLength?: number;
    min?: string;
    max?: string;
    key?: string | React.Key;
}

interface IFioForm {
    setDisable: React.Dispatch<boolean>;
}

interface ISearchBtn extends IFioForm {
    isDisabled: boolean;
}

export type { IDefs, IDefaultInput, IFioForm, ISearchBtn };