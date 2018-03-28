import { expect } from "chai";

import { ExternalStylesFactory } from "./external-styles-factory";

describe("External styles factory", () => {
    let externalStyles;

    beforeEach(() => {
        externalStyles = `
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <w:styles xmlns:mc="first" xmlns:r="second">
            <w:docDefaults>
            </w:docDefaults>
            
            <w:latentStyles w:defLockedState="1" w:defUIPriority="99">
            </w:latentStyles>

            <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
                <w:name w:val="Normal"/>
                <w:qFormat/>
            </w:style>

            <w:style w:type="paragraph" w:styleId="Heading1">
                <w:name w:val="heading 1"/>
                <w:basedOn w:val="Normal"/>
                <w:pPr>
                    <w:keepNext/>
                    <w:keepLines/>

                    <w:pBdr>
                        <w:bottom w:val="single" w:sz="4" w:space="1" w:color="auto"/>
                  </w:pBdr>
                </w:pPr>
            </w:style>
        </w:styles>`;
    });

    describe("#parse", () => {
        it("should parse w:styles attributes", () => {
            const importedStyle = new ExternalStylesFactory().newInstance(externalStyles) as any;

            expect(importedStyle.rootKey).to.equal("w:styles");
            expect(importedStyle.root[0]._attr).to.eql({
                "xmlns:mc": "first",
                "xmlns:r": "second",
            });
        });

        it("should parse other child elements of w:styles", () => {
            const importedStyle = new ExternalStylesFactory().newInstance(externalStyles) as any;

            expect(importedStyle.root.length).to.equal(5);
            expect(importedStyle.root[1]).to.eql({
                root: [],
                rootKey: "w:docDefaults",
            });
            expect(importedStyle.root[2]).to.eql({
                _attr: {
                    "w:defLockedState": "1",
                    "w:defUIPriority": "99",
                },
                root: [],
                rootKey: "w:latentStyles",
            });
        });

        it("should parse styles elements", () => {
            const importedStyle = new ExternalStylesFactory().newInstance(externalStyles) as any;

            expect(importedStyle.root.length).to.equal(5);
            expect(importedStyle.root[3]).to.eql({
                _attr: {
                    "w:default": "1",
                    "w:styleId": "Normal",
                    "w:type": "paragraph",
                },
                root: [
                    {
                        _attr: {
                            "w:val": "Normal",
                        },
                        root: [],
                        rootKey: "w:name",
                    },
                    {
                        root: [],
                        rootKey: "w:qFormat",
                    },
                ],
                rootKey: "w:style",
            });

            expect(importedStyle.root[4]).to.eql({
                _attr: {
                    "w:styleId": "Heading1",
                    "w:type": "paragraph",
                },
                root: [
                    {
                        _attr: {
                            "w:val": "heading 1",
                        },
                        root: [],
                        rootKey: "w:name",
                    },
                    {
                        _attr: {
                            "w:val": "Normal",
                        },
                        root: [],
                        rootKey: "w:basedOn",
                    },
                    {
                        root: [
                            {
                                root: [],
                                rootKey: "w:keepNext",
                            },
                            {
                                root: [],
                                rootKey: "w:keepLines",
                            },
                            {
                                root: [
                                    {
                                        _attr: {
                                            "w:color": "auto",
                                            "w:space": "1",
                                            "w:sz": "4",
                                            "w:val": "single",
                                        },
                                        root: [],
                                        rootKey: "w:bottom",
                                    },
                                ],
                                rootKey: "w:pBdr",
                            },
                        ],
                        rootKey: "w:pPr",
                    },
                ],
                rootKey: "w:style",
            });

        });
    });
});
