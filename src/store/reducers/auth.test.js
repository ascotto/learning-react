import reducer  from "./auth";
import * as actioTypes from "../actions/actionTypes";

/**
 *  Enzyme API: http://airbnb.io/enzyme/docs/api/
 *  Jest Docs: https://facebook.github.io/jest/
 * 
 * 
 */

describe("auth reducer", ()=> {
    it("Should return initial state", ()=>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        });
    });

    it("Should store the token after login", ()=>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: "some-token",
            userId: "some-user-id"
        })).toEqual({
            token: "some-token",
            userId: "some-user-id",
            error: null,
            loading: false,
            authRedirectPath: "/"
           })
    })

});