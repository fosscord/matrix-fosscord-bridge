export class MockDiscordClient {
  public guilds: MockCollection<string, MockGuild>  = new MockCollection();
  public user: MockUser;
  private testLoggedIn: boolean = false;
  private testCallbacks: Array<() => void> = [];

  constructor() {
    let channels = [
      {
        id: "321",
        name: "achannel",
        type: "text",
      }, {
        id: "654",
        name: "a-channel",
        type: "text",
      }, {
        id: "987",
        name: "a channel",
        type: "text",
      },
    ];
    this.guilds.set("123", new MockGuild("MyGuild", channels));
    this.guilds.set("456", new MockGuild("My Spaces Gui", channels));
    this.guilds.set("789", new MockGuild("My Dash-Guild", channels));
    this.user = new MockUser("12345");
  }

  public on(event: string, callback: () => void) {
    if (event === "ready") {
      this.testCallbacks[0] = callback;
    }
  }

  public login(token: string) {
    this.testLoggedIn = true;
    this.testCallbacks[0]();
  }
}

class MockMember {
  public id = "";
  constructor(id: string) {
    this.id = id;
  }
}

class MockUser {
  public id = "";
  constructor(id: string) {
    this.id = id;
  }
}

class MockGuild {
  public channels: MockCollection<string, any> = new MockCollection();
  public members: MockCollection<string, MockMember> = new MockCollection();
  public id: string;
  constructor(id: string, channels: any[]) {
    this.id = id;
    channels.forEach((item) => {
      this.channels.set(item.id, item);
    });
  }
}

class MockCollection<T1, T2> extends Map {
  public array() {
    return [...this.values()];
  }
}