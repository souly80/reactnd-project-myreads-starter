const SelectOption = () => {
    var options = [];
    options.push({
        isDisabled: true,
        value: "none",
        label: "Move to..."
    });
    options.push({
        isDisabled: false,
        value: "currentlyReading",
        label: "Currently Reading"
    });
    options.push({
        isDisabled: false,
        value: "wantToRead",
        label: "Want to Read"
    });
    options.push({
        isDisabled: false,
        value: "read",
        label: "Read"
    });
    options.push({
        isDisabled: false,
        value: "none",
        label: "None"
    });
    return options;
};

export default SelectOption;