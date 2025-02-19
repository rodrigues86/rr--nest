import { Injectable } from '@nestjs/common';
import {
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { User } from './user.model';
import { dynamoDBClient } from 'src/data-source';
import {
  DeleteCommandInput,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class UserRepository {
  private tableName = 'user';

  async insert(user: User): Promise<User> {
    const newUser = new User(user);
    const params = {
      TableName: this.tableName,
      Item: marshall(newUser, {
        convertClassInstanceToMap: true,
      }),
    };

    await dynamoDBClient.send(new PutItemCommand(params));
    return newUser;
  }

  async update(userId: string, updates: Partial<User>): Promise<User | null> {
    const params = new UpdateCommand({
      TableName: this.tableName,
      Key: { userId },
      UpdateExpression: 'set #name = :name, age = :age',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: { ':name': updates.name, ':age': updates.age },
      ReturnValues: 'ALL_NEW',
    });

    const result = await dynamoDBClient.send(params);
    return (result.Attributes as User) || null;
  }

  async delete(userId: string): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: this.tableName,
      Key: marshall({ userId }),
    };

    await dynamoDBClient.send(new DeleteItemCommand(params));
  }

  async get(userId: string): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      Key: marshall({ userId }),
    };

    const { Item } = await dynamoDBClient.send(new GetItemCommand(params));
    return Item ? (unmarshall(Item) as User) : null;
  }

  async getAll(): Promise<User[] | null> {
    const params = {
      TableName: this.tableName,
    };

    const { Items } = await dynamoDBClient.send(new ScanCommand(params));
    return (Items as User[]) || [];
  }
}
