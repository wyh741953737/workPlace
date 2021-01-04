import Component from '../Component';

const React = {
    createElement,
}

function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}

export default {
    createElement,
    Component
};
