/**
 * Describes authorization details of the request subject
 */
export class Principal {
  /**
   * User id
   */
  public id: string;

  /**
   * User roles
   */
  public roles: string[];

  /**
   * Constructor
   */
  constructor(id: string, roles: string[]) {
    this.id = id;
    this.roles = roles;
  }
}
