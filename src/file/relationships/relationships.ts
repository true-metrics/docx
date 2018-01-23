import { XmlComponent } from "file/xml-components";
import { RelationshipsAttributes } from "./attributes";
import { Relationship, RelationshipType } from "./relationship/relationship";

export class Relationships extends XmlComponent {
    constructor() {
        super("Relationships");
        this.root.push(
            new RelationshipsAttributes({
                xmlns: "http://schemas.openxmlformats.org/package/2006/relationships",
            }),
        );

        this.createRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", "styles.xml");
        this.createRelationship(2, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", "numbering.xml");
    }

    public addRelationship(relationship: Relationship): void {
        this.root.push(relationship);
    }

    public createRelationship(id: number, type: RelationshipType, target: string): Relationship {
        const relationship = new Relationship(`rId${id}`, type, target);
        this.addRelationship(relationship);

        return relationship;
    }
}
